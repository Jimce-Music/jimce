//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:jimce_api_flutter/src/model/jwt_payload.dart';
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_auth_check_token_get200_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAuthCheckTokenGet200Response {
  /// Returns a new [ApiAuthCheckTokenGet200Response] instance.
  ApiAuthCheckTokenGet200Response({

    required  this.payload,

    required  this.isAdmin,
  });

  @JsonKey(
    
    name: r'payload',
    required: true,
    includeIfNull: false,
  )


  final JWTPayload payload;



  @JsonKey(
    
    name: r'isAdmin',
    required: true,
    includeIfNull: false,
  )


  final bool isAdmin;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAuthCheckTokenGet200Response &&
      other.payload == payload &&
      other.isAdmin == isAdmin;

    @override
    int get hashCode =>
        payload.hashCode +
        isAdmin.hashCode;

  factory ApiAuthCheckTokenGet200Response.fromJson(Map<String, dynamic> json) => _$ApiAuthCheckTokenGet200ResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAuthCheckTokenGet200ResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

