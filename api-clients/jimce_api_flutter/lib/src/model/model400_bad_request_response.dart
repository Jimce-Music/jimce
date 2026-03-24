//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model400_bad_request_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class Model400BadRequestResponse {
  /// Returns a new [Model400BadRequestResponse] instance.
  Model400BadRequestResponse({

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


  final Model400BadRequestResponseStatusCodeEnum statusCode;



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


  final Model400BadRequestResponseErrorEnum error;



      /// Error message describing what went wrong
  @JsonKey(
    
    name: r'message',
    required: true,
    includeIfNull: false,
  )


  final String message;





    @override
    bool operator ==(Object other) => identical(this, other) || other is Model400BadRequestResponse &&
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

  factory Model400BadRequestResponse.fromJson(Map<String, dynamic> json) => _$Model400BadRequestResponseFromJson(json);

  Map<String, dynamic> toJson() => _$Model400BadRequestResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}


enum Model400BadRequestResponseStatusCodeEnum {
@JsonValue('400')
n400('400');

const Model400BadRequestResponseStatusCodeEnum(this.value);

final String value;

@override
String toString() => value;
}



enum Model400BadRequestResponseErrorEnum {
@JsonValue(r'Bad Request')
badRequest(r'Bad Request');

const Model400BadRequestResponseErrorEnum(this.value);

final String value;

@override
String toString() => value;
}


