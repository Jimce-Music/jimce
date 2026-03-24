// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'jwt_payload.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$JWTPayloadCWProxy {
  JWTPayload id(String id);

  JWTPayload username(String username);

  JWTPayload validUntil(String validUntil);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `JWTPayload(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// JWTPayload(...).copyWith(id: 12, name: "My name")
  /// ```
  JWTPayload call({String id, String username, String validUntil});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfJWTPayload.copyWith(...)` or call `instanceOfJWTPayload.copyWith.fieldName(value)` for a single field.
class _$JWTPayloadCWProxyImpl implements _$JWTPayloadCWProxy {
  const _$JWTPayloadCWProxyImpl(this._value);

  final JWTPayload _value;

  @override
  JWTPayload id(String id) => call(id: id);

  @override
  JWTPayload username(String username) => call(username: username);

  @override
  JWTPayload validUntil(String validUntil) => call(validUntil: validUntil);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `JWTPayload(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// JWTPayload(...).copyWith(id: 12, name: "My name")
  /// ```
  JWTPayload call({
    Object? id = const $CopyWithPlaceholder(),
    Object? username = const $CopyWithPlaceholder(),
    Object? validUntil = const $CopyWithPlaceholder(),
  }) {
    return JWTPayload(
      id: id == const $CopyWithPlaceholder() || id == null
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as String,
      username: username == const $CopyWithPlaceholder() || username == null
          ? _value.username
          // ignore: cast_nullable_to_non_nullable
          : username as String,
      validUntil:
          validUntil == const $CopyWithPlaceholder() || validUntil == null
          ? _value.validUntil
          // ignore: cast_nullable_to_non_nullable
          : validUntil as String,
    );
  }
}

extension $JWTPayloadCopyWith on JWTPayload {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfJWTPayload.copyWith(...)` or `instanceOfJWTPayload.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$JWTPayloadCWProxy get copyWith => _$JWTPayloadCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

JWTPayload _$JWTPayloadFromJson(Map<String, dynamic> json) =>
    $checkedCreate('JWTPayload', json, ($checkedConvert) {
      $checkKeys(json, requiredKeys: const ['id', 'username', 'validUntil']);
      final val = JWTPayload(
        id: $checkedConvert('id', (v) => v as String),
        username: $checkedConvert('username', (v) => v as String),
        validUntil: $checkedConvert('validUntil', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$JWTPayloadToJson(JWTPayload instance) =>
    <String, dynamic>{
      'id': instance.id,
      'username': instance.username,
      'validUntil': instance.validUntil,
    };
