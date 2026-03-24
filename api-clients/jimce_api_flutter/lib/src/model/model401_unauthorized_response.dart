//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model401_unauthorized_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class Model401UnauthorizedResponse {
  /// Returns a new [Model401UnauthorizedResponse] instance.
  Model401UnauthorizedResponse({

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


  final Model401UnauthorizedResponseStatusCodeEnum statusCode;



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


  final Model401UnauthorizedResponseErrorEnum error;



      /// Error message describing what went wrong
  @JsonKey(
    
    name: r'message',
    required: true,
    includeIfNull: false,
  )


  final String message;





    @override
    bool operator ==(Object other) => identical(this, other) || other is Model401UnauthorizedResponse &&
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

  factory Model401UnauthorizedResponse.fromJson(Map<String, dynamic> json) => _$Model401UnauthorizedResponseFromJson(json);

  Map<String, dynamic> toJson() => _$Model401UnauthorizedResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}


enum Model401UnauthorizedResponseStatusCodeEnum {
@JsonValue('401')
n401('401');

const Model401UnauthorizedResponseStatusCodeEnum(this.value);

final String value;

@override
String toString() => value;
}



enum Model401UnauthorizedResponseErrorEnum {
@JsonValue(r'Unauthorized')
unauthorized(r'Unauthorized');

const Model401UnauthorizedResponseErrorEnum(this.value);

final String value;

@override
String toString() => value;
}


