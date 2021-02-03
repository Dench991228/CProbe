### Design of a Compiler State Table
#### Goal
- To describe the state of the compiler while compiling
- Find fault as early as possible
#### Expression State
The whole expression is like a binary branch tree, I'll use a stack to maintain the state of an expression which include
- state:
    - result type: string
    - left value: boolean
    - left child finished: boolean
    - is constant expression: boolean
    
When entering a state push in a brand-new state,when exiting a state, update its state and poll it from the stack and save it.
#### Declaration State
#### Statement State
