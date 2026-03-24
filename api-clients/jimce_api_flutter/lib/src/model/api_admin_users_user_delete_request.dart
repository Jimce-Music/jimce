//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'api_admin_users_user_delete_request.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class ApiAdminUsersUserDeleteRequest {
  /// Returns a new [ApiAdminUsersUserDeleteRequest] instance.
  ApiAdminUsersUserDeleteRequest({

    required  this.id,
  });

      /// The uuid of the user to delete
  @JsonKey(
    
    name: r'id',
    required: true,
    includeIfNull: false,
  )


  final String id;





    @override
    bool operator ==(Object other) => identical(this, other) || other is ApiAdminUsersUserDeleteRequest &&
      other.id == id;

    @override
    int get hashCode =>
        id.hashCode;

  factory ApiAdminUsersUserDeleteRequest.fromJson(Map<String, dynamic> json) => _$ApiAdminUsersUserDeleteRequestFromJson(json);

  Map<String, dynamic> toJson() => _$ApiAdminUsersUserDeleteRequestToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

