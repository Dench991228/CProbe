### Design of Symbol Table
#### Overall structure
- has multiple layers, identifiers in inner layers can shadow those in outer layer
- indexed by the name of the identifier
- record following information:
  - variable(constant) definitions
  - constant values
  - functions
  - structs
  - enumerations
  - typedefs
#### Table Entry
- Name: the name of the identifier
- IdentifierType: 
    - variable
    - function name
    - type name
    - struct name
    - enum name
    
- Variables(Constant):
  - Type: a stack because we may face a problem of int ***, and the calculation of pointer is only decided by the type being pointed, so I believe a stack of type could well serve this means
  - IsConstant: a stack indicate whether the value is constant. Because there might be variables like int const ** a
    - the last element of IsConstant indicate whether the element can be modified not about the pointer
  - dimensions: an array, which indicate the size of all dimensions of an array. also indicate whether designating is allowed. A plain int** can't be visited like a[i][j]

- Enum: 
  - features:
    - just like macros, processed before compilation and doesn't consume storage
    - integer constant
    - area of collide is like variables, inner layer definition can shadow outside definitions
    - a variable of an enumeration type cannot be initialized as another enumeration type even if the value are the same
  - items in the entry
    - name
    - value
    - enumeration name
  
- Struct:
  - features:
    - can be declared anywhere
    - can be anonymous
    - new scope
  - items in the entry
    - name: name of the struct
    - fields: indexed by the name of field, others are the same
  
- typedef:
  - features:
    - pretty resembles macros
    - new types are identifiers as well
  - 
    