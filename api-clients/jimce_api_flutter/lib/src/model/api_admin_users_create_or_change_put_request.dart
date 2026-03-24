//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_admin_users_create_or_change_put_request.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAdminUsersCreateOrChangePutRequest {
  /// Returns a new [ApiAdminUsersCreateOrChangePutRequest] instance.
  ApiAdminUsersCreateOrChangePutRequest({

    required  this.username,

     this.password,

    required  this.email,

    required  this.isAdmin,
  });

      /// The username which will be assigned to the user (if already in use, user will be updated)
  @JsonKey(
    
    name: r'username',
    required: true,
    includeIfNull: false,
  )


  final String username;



      /// The new password in plain text for the user. Optional when user already exists, necessary when creating from scratch. Must be at least 12 characters long
  @JsonKey(
    
    name: r'password',
    required: false,
    includeIfNull: false,
  )


  final String? password;



  @JsonKey(
    
    name: r'email',
    required: true,
    includeIfNull: true,
  )


  final String? email;



      /// Declares whether the user shall have admin rights
  @JsonKey(
    
    name: r'isAdmin',
    required: true,
    includeIfNull: false,
  )


  final bool isAdmin;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAdminUsersCreateOrChangePutRequest &&
      other.username == username &&
      other.password == password &&
      other.email == email &&
      other.isAdmin == isAdmin;

    @override
    int get hashCode =>
        username.hashCode +
        password.hashCode +
        (email == null ? 0 : email.hashCode) +
        isAdmin.hashCode;

  factory ApiAdminUsersCreateOrChangePutRequest.fromJson(Map<String, dynamic> json) => _$ApiAdminUsersCreateOrChangePutRequestFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAdminUsersCreateOrChangePutRequestToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

