import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, Operation } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { getOperationName } from '@apollo/client/utilities';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext((operation, context) => {
        const token = localStorage.getItem('accessToken'); 
        return {
          headers: {
            ...(context['headers'] || {}),
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });
      return {
        cache: new InMemoryCache(),
        link: ApolloLink.split(
          (operation: Operation) => {
            const opName = getOperationName(operation.query);
            console.log('[Apollo] Routing Operation:', opName);
            return opName === 'verifyToken' || opName === 'Login' || opName === 'Register';
          },
          authLink.concat(httpLink.create({ uri: 'http://localhost:5000/graphql' })), // Auth MS
          authLink.concat(httpLink.create({ uri: 'http://localhost:5001/graphql' }))  // Resident MS
        )
      };
    }),
  ],
};
