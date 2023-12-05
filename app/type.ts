type Unit = {
    name: string,
    price: number,
    weight: number
}

type UnconvertedUnit = {
    name: string,
    price: string,
    weight: string
}

type ProductData = {
    id: number,
    name: string,
    desc: string,
    quantity: number,
    basePrice: number,
    supplier: number,
    units: Unit[]
}

type Invoice = {
    product: ProductData,
    quantity: number,
    unit: Unit,
    total: number
}

type Schedule = {
    startHour: Date,
    endHour: Date
}

type StaffData = {
    id: number,
    fname: string,
    lname: string,
    role: string,
    email: string,
    phone: string,
    birthday: Date | string,
    //schedule: Schedule[]
}

type SumHoursStaffData = {
    id: number,
    fname: string,
    lname: string,
    role: string,
    totalHours: number
}

type DatabaseResponse = {
    success: boolean,
    message: string
}