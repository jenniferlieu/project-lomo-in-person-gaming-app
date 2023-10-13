---
sidebar_position: 7
---
# Extra: MongoDB datatype conversion to PHP
Please refer to the database diagram for database tables and fields.

- **String**: Converted to PHP string.
- **Integer (Int32)**: Converted to PHP integer.
- **Long (Int64)**: Converted to PHP float for 64-bit integers (since PHP's `int` is 32-bit).
- **Double**: Converted to PHP float.
- **Boolean**: Converted to PHP boolean.
- **Date**: Converted to PHP `DateTime` object.
- **Array**: Converted to PHP array.
- **Embedded Document (Subdocument)**: Converted to PHP associative array or object.
- **ObjectId**: Converted to PHP string (hex representation).
- **Binary Data**: Converted to PHP binary data.
- **Decimal128**: Converted to PHP string (MongoDB's Decimal128 is precise and can have more significant digits than PHP float).
- **Undefined**: Converted to PHP `null`.
- **MinKey**: Converted to PHP `null`.
- **MaxKey**: Converted to PHP `null`.
- **Regular Expression**: Converted to PHP string (regex pattern).