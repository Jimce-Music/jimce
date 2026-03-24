//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model500_internal_server_error_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class Model500InternalServerErrorResponse {
  /// Returns a new [Model500InternalServerErrorResponse] instance.
  Model500InternalServerErrorResponse({

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


  final Model500InternalServerErrorResponseStatusCodeEnum statusCode;



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


  final Model500InternalServerErrorResponseErrorEnum error;



      /// Error message describing what went wrong
  @JsonKey(
    
    name: r'message',
    required: true,
    includeIfNull: false,
  )


  final String message;





    @override
    bool operator ==(Object other) => identical(this, other) || other is Model500InternalServerErrorResponse &&
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

  factory Model500InternalServerErrorResponse.fromJson(Map<String, dynamic> json) => _$Model500InternalServerErrorResponseFromJson(json);

  Map<String, dynamic> toJson() => _$Model500InternalServerErrorResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}


enum Model500InternalServerErrorResponseStatusCodeEnum {
@JsonValue('500')
n500('500');

const Model500InternalServerErrorResponseStatusCodeEnum(this.value);

final String value;

@override
String toString() => value;
}



enum Model500InternalServerErrorResponseErrorEnum {
@JsonValue(r'Internal Server Error')
internalServerError(r'Internal Server Error');

const Model500InternalServerErrorResponseErrorEnum(this.value);

final String value;

@override
String toString() => value;
}


