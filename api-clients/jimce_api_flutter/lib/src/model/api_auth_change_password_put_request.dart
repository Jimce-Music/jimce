//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_auth_change_password_put_request.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAuthChangePasswordPutRequest {
  /// Returns a new [ApiAuthChangePasswordPutRequest] instance.
  ApiAuthChangePasswordPutRequest({

    required  this.newPassword,
  });

      /// The new password as plain text for the user
  @JsonKey(
    
    name: r'newPassword',
    required: true,
    includeIfNull: false,
  )


  final String newPassword;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAuthChangePasswordPutRequest &&
      other.newPassword == newPassword;

    @override
    int get hashCode =>
        newPassword.hashCode;

  factory ApiAuthChangePasswordPutRequest.fromJson(Map<String, dynamic> json) => _$ApiAuthChangePasswordPutRequestFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAuthChangePasswordPutRequestToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

