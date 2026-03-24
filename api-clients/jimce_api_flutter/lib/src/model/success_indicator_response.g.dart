// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'success_indicator_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$SuccessIndicatorResponseCWProxy {
  SuccessIndicatorResponse success(bool success);

  SuccessIndicatorResponse reason(String? reason);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `SuccessIndicatorResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// SuccessIndicatorResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  SuccessIndicatorResponse call({bool success, String? reason});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfSuccessIndicatorResponse.copyWith(...)` or call `instanceOfSuccessIndicatorResponse.copyWith.fieldName(value)` for a single field.
class _$SuccessIndicatorResponseCWProxyImpl
    implements _$SuccessIndicatorResponseCWProxy {
  const _$SuccessIndicatorResponseCWProxyImpl(this._value);

  final SuccessIndicatorResponse _value;

  @override
  SuccessIndicatorResponse success(bool success) => call(success: success);

  @override
  SuccessIndicatorResponse reason(String? reason) => call(reason: reason);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `SuccessIndicatorResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// SuccessIndicatorResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  SuccessIndicatorResponse call({
    Object? success = const $CopyWithPlaceholder(),
    Object? reason = const $CopyWithPlaceholder(),
  }) {
    return SuccessIndicatorResponse(
      success: success == const $CopyWithPlaceholder() || success == null
          ? _value.success
          // ignore: cast_nullable_to_non_nullable
          : success as bool,
      reason: reason == const $CopyWithPlaceholder()
          ? _value.reason
          // ignore: cast_nullable_to_non_nullable
          : reason as String?,
    );
  }
}

extension $SuccessIndicatorResponseCopyWith on SuccessIndicatorResponse {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfSuccessIndicatorResponse.copyWith(...)` or `instanceOfSuccessIndicatorResponse.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$SuccessIndicatorResponseCWProxy get copyWith =>
      _$SuccessIndicatorResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SuccessIndicatorResponse _$SuccessIndicatorResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('SuccessIndicatorResponse', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['success']);
  final val = SuccessIndicatorResponse(
    success: $checkedConvert('success', (v) => v as bool),
    reason: $checkedConvert('reason', (v) => v as String?),
  );
  return val;
});

Map<String, dynamic> _$SuccessIndicatorResponseToJson(
  SuccessIndicatorResponse instance,
) => <String, dynamic>{'success': instance.success, 'reason': ?instance.reason};
