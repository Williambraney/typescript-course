let userName: string | number  = "John Doe";

const apiKey = "12345-abcde"; // Example of a constant which does not need a type annotation

let objectWithMixedTypes: { name: string; age: number; numbers: { 1 : number; 2 : string}[] } = {
  name: "Alice",
  age: 30,
    numbers: [
        { 1: 10, 2: "twenty" },
        { 1: 20, 2: "forty" }
    ]
};

let arrayOfNumbers: number[] = [1, 2, 3, 4, 5];
let arrayOfStrings: string[] = ['1', '2', '3', '4', '5'];

let arrayOfObjects: { name: string; age: number }[] = [
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 28 }
];
let arrayOfMixedTypes: ({ name: string; age: number } | string | number )[] = [
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 28 },
    "This is a string",
    23
];

userName = 34;

function greetUser(name: string | number): string {
    if (typeof name === "number") {
        return `Hello, user number ${name}!`;
    }
    return `Hello, ${name}!`;
}

function processArray(arr: (string | number)[]): void {
    arr.forEach(item => {
        if (typeof item === "string") {
            console.log(`String item: ${item}`);
        } else if (typeof item === "number") {
            console.log(`Number item: ${item}`);
        }
    });
}

function calculate(a: number, b: number, calcFn: (a:number, b:number) => number ): number {
    return calcFn(a, b);
}

calculate(5, 10, (a, b) => a + b); // Example usage of calculate function

type stringOrNumber = string | number;
type functionType = (value: string | number) => void;

function printValue(value: stringOrNumber, addFunction: functionType): void {
    if (typeof value === "string") {
        console.log(`String value: ${value}`);
    } else if (typeof value === "number") {
        console.log(`Number value: ${value}`);
    }
}

type User = {
    name: string;
    age: number;
    isActive: boolean;
}

function createUser(user: User): void {
    console.log(`User created: ${user.name}, Age: ${user.age}, Active: ${user.isActive}`);
}
//
interface Product {
    id: number;
    name: string;
    price: number;
}

let creds: Product;

creds = {
    id: 1,
    name: "Laptop",
    price: 999.99
}

// Would use interface if you were using classes, which I wont proabably do that much
// Interface is limited to objects
// You can also easily extend interfaces

interface ExtendedProduct extends Product {
    category: string;
}

type Admin = {
    permsissions: string[];
}

type AppUser = {
    userName: string;
}

// Example of merging types
// This is useful when you want to combine properties from multiple types into one
// This is the type version compared to the interface version above which uses extends
type AdminUser = Admin & AppUser;

let admin: AdminUser;

admin = {
    permsissions: ["read", "write", "delete"],
    userName: "adminUser"
};

// Example of setting a specific string as a literal type - key term
type UserRole = "admin" | "user" | "guest";
let role: UserRole = "admin"; // This can only be "admin", "user", or "guest"

// Example of type narrowing - key term
function handleRole(role: UserRole): void {
    switch (role) {
        case "admin":
            console.log("Handling admin role");
            break;
        case "user":
            console.log("Handling user role");
            break;
        case "guest":
            console.log("Handling guest role");
            break;
        default:
            console.error("Unknown role");
    }
}

// Example of generic types - key term
let roles: Array<UserRole>
roles = ["admin", "user", "guest"]; // This can only contain "admin", "user", or "guest"

// T stands for type, it can be anything
type DataStorage<T> = {
    storage: T[];
    add: (item: T) => void;
    get: (index: number) => T | undefined;
}

const textStorage: DataStorage<string> = {
    storage: [],
    add(item: string) {
        this.storage.push(item);
    },
    get(index: number) {
        return this.storage[index];
    }
}

const userStorage: DataStorage<User> = {
    storage: [],
    add(item: User) {
        this.storage.push(item);
    },
    get(index: number) {
        return this.storage[index];
    }
}

// U is a generic type that can be anything
function merge<T, U>(objA: T, objB: U): T & U {
    return { ...objA, ...objB };
}

const user = merge<{name: string}, {age: number}>(
    { name: "Alice" },
    { age: 30 }
);

user.age; // 30
user.name; // "Alice"

