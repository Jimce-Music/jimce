//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:json_annotation/json_annotation.dart';

part 'success_indicator_response.g.dart';


@CopyWith()
@JsonSerializable(
  checked: true,
  createToJson: true,
  disallowUnrecognizedKeys: false,
  explicitToJson: true,
)
class SuccessIndicatorResponse {
  /// Returns a new [SuccessIndicatorResponse] instance.
  SuccessIndicatorResponse({

    required  this.success,

     this.reason,
  });

      /// States whether the requested action was successful
  @JsonKey(
    
    name: r'success',
    required: true,
    includeIfNull: false,
  )


  final bool success;



      /// An optional reason for the success or fail of your requested action
  @JsonKey(
    
    name: r'reason',
    required: false,
    includeIfNull: false,
  )


  final String? reason;





    @override
    bool operator ==(Object other) => identical(this, other) || other is SuccessIndicatorResponse &&
      other.success == success &&
      other.reason == reason;

    @override
    int get hashCode =>
        success.hashCode +
        reason.hashCode;

  factory SuccessIndicatorResponse.fromJson(Map<String, dynamic> json) => _$SuccessIndicatorResponseFromJson(json);

  Map<String, dynamic> toJson() => _$SuccessIndicatorResponseToJson(this);

  @override
  String toString() {
    return toJson().toString();
  }

}

