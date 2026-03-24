//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'jwt_payload.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class JWTPayload {
  /// Returns a new [JWTPayload] instance.
  JWTPayload({

    required  this.id,

    required  this.username,

    required  this.validUntil,
  });

      /// The uuid of the user
  @JsonKey(
    
    name: r'id',
    required: true,
    includeIfNull: false,
  )


  final String id;



      /// The username of the user
  @JsonKey(
    
    name: r'username',
    required: true,
    includeIfNull: false,
  )


  final String username;



      /// The timestamp describing when the token will become invalidated
  @JsonKey(
    
    name: r'validUntil',
    required: true,
    includeIfNull: false,
  )


  final String validUntil;





    @override
    bool operator ==(Object other) => identical(this, other) || other is JWTPayload &&
      other.id == id &&
      other.username == username &&
      other.validUntil == validUntil;

    @override
    int get hashCode =>
        id.hashCode +
        username.hashCode +
        validUntil.hashCode;

  factory JWTPayload.fromJson(Map<String, dynamic> json) => _$JWTPayloadFromJson(json);

  Map<String, dynamic> toJson() => _$JWTPayloadToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

