import 'package:jimce_api_flutter/src/model/api_admin_users_create_or_change_put_request.dart';
import 'package:jimce_api_flutter/src/model/api_admin_users_list_users_get200_response_inner.dart';
import 'package:jimce_api_flutter/src/model/api_admin_users_user_delete_request.dart';
import 'package:jimce_api_flutter/src/model/api_auth_change_password_put_request.dart';
import 'package:jimce_api_flutter/src/model/api_auth_check_token_get200_response.dart';
import 'package:jimce_api_flutter/src/model/api_auth_login_basic_post200_response.dart';
import 'package:jimce_api_flutter/src/model/api_auth_login_basic_post_request.dart';
import 'package:jimce_api_flutter/src/model/api_me_userinfo_get200_response.dart';
import 'package:jimce_api_flutter/src/model/jwt_payload.dart';
import 'package:jimce_api_flutter/src/model/model400_bad_request_response.dart';
import 'package:jimce_api_flutter/src/model/model401_unauthorized_response.dart';
import 'package:jimce_api_flutter/src/model/model403_forbidden_response.dart';
import 'package:jimce_api_flutter/src/model/model500_internal_server_error_response.dart';
import 'package:jimce_api_flutter/src/model/success_indicator_response.dart';

final _regList = RegExp(r'^List<(.*)>$');
final _regSet = RegExp(r'^Set<(.*)>$');
final _regMap = RegExp(r'^Map<String,(.*)>$');

  ReturnType deserialize<ReturnType, BaseType>(dynamic value, String targetType, {bool growable= true}) {
      switch (targetType) {
        case 'String':
          return '$value' as ReturnType;
        case 'int':
          return (value is int ? value : int.parse('$value')) as ReturnType;
        case 'bool':
          if (value is bool) {
            return value as ReturnType;
          }
          final valueString = '$value'.toLowerCase();
          return (valueString == 'true' || valueString == '1') as ReturnType;
        case 'double':
          return (value is double ? value : double.parse('$value')) as ReturnType;
        case 'ApiAdminUsersCreateOrChangePutRequest':
          return ApiAdminUsersCreateOrChangePutRequest.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAdminUsersListUsersGet200ResponseInner':
          return ApiAdminUsersListUsersGet200ResponseInner.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAdminUsersUserDeleteRequest':
          return ApiAdminUsersUserDeleteRequest.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAuthChangePasswordPutRequest':
          return ApiAuthChangePasswordPutRequest.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAuthCheckTokenGet200Response':
          return ApiAuthCheckTokenGet200Response.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAuthLoginBasicPost200Response':
          return ApiAuthLoginBasicPost200Response.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiAuthLoginBasicPostRequest':
          return ApiAuthLoginBasicPostRequest.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'ApiMeUserinfoGet200Response':
          return ApiMeUserinfoGet200Response.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'JWTPayload':
          return JWTPayload.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'Model400BadRequestResponse':
          return Model400BadRequestResponse.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'Model401UnauthorizedResponse':
          return Model401UnauthorizedResponse.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'Model403ForbiddenResponse':
          return Model403ForbiddenResponse.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'Model500InternalServerErrorResponse':
          return Model500InternalServerErrorResponse.fromJson(value as Map<String, dynamic>) as ReturnType;
        case 'SuccessIndicatorResponse':
          return SuccessIndicatorResponse.fromJson(value as Map<String, dynamic>) as ReturnType;
        default:
          RegExpMatch? match;

          if (value is List && (match = _regList.firstMatch(targetType)) != null) {
            targetType = match![1]!; // ignore: parameter_assignments
            return value
              .map<BaseType>((dynamic v) => deserialize<BaseType, BaseType>(v, targetType, growable: growable))
              .toList(growable: growable) as ReturnType;
          }
          if (value is Set && (match = _regSet.firstMatch(targetType)) != null) {
            targetType = match![1]!; // ignore: parameter_assignments
            return value
              .map<BaseType>((dynamic v) => deserialize<BaseType, BaseType>(v, targetType, growable: growable))
              .toSet() as ReturnType;
          }
          if (value is Map && (match = _regMap.firstMatch(targetType)) != null) {
            targetType = match![1]!.trim(); // ignore: parameter_assignments
            return Map<String, BaseType>.fromIterables(
              value.keys as Iterable<String>,
              value.values.map((dynamic v) => deserialize<BaseType, BaseType>(v, targetType, growable: growable)),
            ) as ReturnType;
          }
          break;
    }
    throw Exception('Cannot deserialize');
  }