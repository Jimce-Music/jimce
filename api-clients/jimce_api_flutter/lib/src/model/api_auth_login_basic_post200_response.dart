//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_auth_login_basic_post200_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAuthLoginBasicPost200Response {
  /// Returns a new [ApiAuthLoginBasicPost200Response] instance.
  ApiAuthLoginBasicPost200Response({

    required  this.token,
  });

      /// The Json Web Token (JWT) issued by the server
  @JsonKey(
    
    name: r'token',
    required: true,
    includeIfNull: false,
  )


  final String token;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAuthLoginBasicPost200Response &&
      other.token == token;

    @override
    int get hashCode =>
        token.hashCode;

  factory ApiAuthLoginBasicPost200Response.fromJson(Map<String, dynamic> json) => _$ApiAuthLoginBasicPost200ResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAuthLoginBasicPost200ResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

