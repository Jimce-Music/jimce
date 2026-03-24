//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_auth_login_basic_post_request.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAuthLoginBasicPostRequest {
  /// Returns a new [ApiAuthLoginBasicPostRequest] instance.
  ApiAuthLoginBasicPostRequest({

    required  this.username,

    required  this.password,
  });

  @JsonKey(
    
    name: r'username',
    required: true,
    includeIfNull: false,
  )


  final String username;



  @JsonKey(
    
    name: r'password',
    required: true,
    includeIfNull: false,
  )


  final String password;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAuthLoginBasicPostRequest &&
      other.username == username &&
      other.password == password;

    @override
    int get hashCode =>
        username.hashCode +
        password.hashCode;

  factory ApiAuthLoginBasicPostRequest.fromJson(Map<String, dynamic> json) => _$ApiAuthLoginBasicPostRequestFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAuthLoginBasicPostRequestToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

