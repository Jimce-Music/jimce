//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_me_userinfo_get200_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiMeUserinfoGet200Response {
  /// Returns a new [ApiMeUserinfoGet200Response] instance.
  ApiMeUserinfoGet200Response({

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
    includeIfNull: true,
  )


  final String? username;



  @JsonKey(
    
    name: r'email',
    required: true,
    includeIfNull: true,
  )


  final String? email;



  @JsonKey(
    
    name: r'isAdmin',
    required: true,
    includeIfNull: false,
  )


  final bool isAdmin;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiMeUserinfoGet200Response &&
      other.id == id &&
      other.username == username &&
      other.email == email &&
      other.isAdmin == isAdmin;

    @override
    int get hashCode =>
        id.hashCode +
        (username == null ? 0 : username.hashCode) +
        (email == null ? 0 : email.hashCode) +
        isAdmin.hashCode;

  factory ApiMeUserinfoGet200Response.fromJson(Map<String, dynamic> json) => _$ApiMeUserinfoGet200ResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ApiMeUserinfoGet200ResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

