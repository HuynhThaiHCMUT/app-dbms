type Unit = {
    name: string,
    price: number,
    basePrice: number,
    weight: number
}

type UnconvertedUnit = {
    name: string,
    price: string,
    basePrice: string,
    weight: string
}

type ProductData = {
    _id: string,
    id: number,
    name: string,
    quantity: number,
    units: Unit[]
}

type NewProductData = {
    id: number,
    name: string,
    quantity: number,
    units: Unit[]
}

type PutProductRequestBody = {
    key: string,
    body: NewProductData
}

type Invoice = {
    product: ProductData,
    quantity: number,
    unit: Unit,
    total: number
}

type Schedule = {
    start: Date,
    end: Date
}

type StaffData = {
    id: number,
    fname: string,
    lname: string,
    role: string,
    email: string,
    phone: string,
    birthday: Date,
    schedule: Schedule[]
}

type NewStaffData = {
    fname: string,
    lname: string,
    role: string,
    email: string,
    phone: string,
    birthday: Date,
    schedule: Schedule[]
}

type PutStaffRequestBody = {
    key: string,
    body: NewStaffData
}

type DatabaseResponse = {
    success: boolean,
    message: string
}