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
    weekDay: string,
    start: string,
    end: string
}

type StaffData = {
    _id: string,
    id: number,
    name: string,
    role: string,
    email: string,
    phone: string,
    schedule: Schedule[]
}

type NewStaffData = {
    id: number,
    name: string,
    role: string,
    email: string,
    phone: string,
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