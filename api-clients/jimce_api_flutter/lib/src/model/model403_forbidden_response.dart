//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model403_forbidden_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class Model403ForbiddenResponse {
  /// Returns a new [Model403ForbiddenResponse] instance.
  Model403ForbiddenResponse({

    required  this.statusCode,

    required  this.code,

    required  this.error,

    required  this.message,
  });

  @JsonKey(
    
    name: r'statusCode',
    required: true,
    includeIfNull: false,
  )


  final Model403ForbiddenResponseStatusCodeEnum statusCode;



      /// Internal code describing the error
  @JsonKey(
    
    name: r'code',
    required: true,
    includeIfNull: false,
  )


  final String code;



  @JsonKey(
    
    name: r'error',
    required: true,
    includeIfNull: false,
  )


  final Model403ForbiddenResponseErrorEnum error;



      /// Error message describing what went wrong
  @JsonKey(
    
    name: r'message',
    required: true,
    includeIfNull: false,
  )


  final String message;





    @override
    bool operator ==(Object other) => identical(this, other) || other is Model403ForbiddenResponse &&
      other.statusCode == statusCode &&
      other.code == code &&
      other.error == error &&
      other.message == message;

    @override
    int get hashCode =>
        statusCode.hashCode +
        code.hashCode +
        error.hashCode +
        message.hashCode;

  factory Model403ForbiddenResponse.fromJson(Map<String, dynamic> json) => _$Model403ForbiddenResponseFromJson(json);

  Map<String, dynamic> toJson() => _$Model403ForbiddenResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}


enum Model403ForbiddenResponseStatusCodeEnum {
@JsonValue('403')
n403('403');

const Model403ForbiddenResponseStatusCodeEnum(this.value);

final String value;

@override
String toString() => value;
}



enum Model403ForbiddenResponseErrorEnum {
@JsonValue(r'Forbidden')
forbidden(r'Forbidden');

const Model403ForbiddenResponseErrorEnum(this.value);

final String value;

@override
String toString() => value;
}


