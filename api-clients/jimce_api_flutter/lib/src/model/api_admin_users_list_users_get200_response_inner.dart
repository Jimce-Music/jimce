//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_admin_users_list_users_get200_response_inner.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAdminUsersListUsersGet200ResponseInner {
  /// Returns a new [ApiAdminUsersListUsersGet200ResponseInner] instance.
  ApiAdminUsersListUsersGet200ResponseInner({

    required  this.id,

    required  this.username,

    required  this.email,

    required  this.isAdmin,
  });

      /// The uuid of the user
  @JsonKey(
    
    name: r'id',
    required: true,
    includeIfNull: false,
  )


  final String id;



  @JsonKey(
    
    name: r'username',
    required: true,
    includeIfNull: false,
  )


  final String username;



  @JsonKey(
    
    name: r'email',
    required: true,
    includeIfNull: true,
  )


  final String? email;



      /// Defines whether the user has admin privileges
  @JsonKey(
    
    name: r'isAdmin',
    required: true,
    includeIfNull: false,
  )


  final bool isAdmin;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAdminUsersListUsersGet200ResponseInner &&
      other.id == id &&
      other.username == username &&
      other.email == email &&
      other.isAdmin == isAdmin;

    @override
    int get hashCode =>
        id.hashCode +
        username.hashCode +
        (email == null ? 0 : email.hashCode) +
        isAdmin.hashCode;

  factory ApiAdminUsersListUsersGet200ResponseInner.fromJson(Map<String, dynamic> json) => _$ApiAdminUsersListUsersGet200ResponseInnerFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAdminUsersListUsersGet200ResponseInnerToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

