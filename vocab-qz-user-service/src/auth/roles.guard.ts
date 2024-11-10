// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Roles } from './decorators/roles.decorator';
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get(Roles, context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const staff = request.staff;
//     const hasRole = () =>
//       staff?.roles?.some((role: string) => !roles.find(item => item === role));

//     return staff && staff.roles && hasRole();
//   }
// }