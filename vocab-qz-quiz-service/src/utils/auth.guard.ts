// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ALLOW_ANONYMOUS_META_KEY } from '@utils/decorators/auth-user.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const isAnonymous = this.reflector.get<boolean>(
//       ALLOW_ANONYMOUS_META_KEY,
//       context.getHandler(),
//     );

//     if (isAnonymous) {
//       // Skip authentication if AllowAnonymous is set to true
//       return true;
//     }

//     // Perform your authentication logic here
//     // Example: Check if the user is authenticated
//     const request = context.switchToHttp().getRequest();
//     if (request.user) {
//       return true; // User is authenticated
//     }

//     return false; // User is not authenticated
//   }
// }
