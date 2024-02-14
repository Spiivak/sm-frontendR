import { useState } from "react"

export const useForm = (initialState: any) => {
    const [fields, setFields] = useState(initialState)

    function handleChange({ target }: any, fieldType: string) {
        let { value, name: field, type, checked } = target
        console.log('handleChange  type:', type)
        console.log('handleChange  field:', field)
        console.log('handleChange  typeof value:', value)
    
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = checked
                break
            case 'time':
                // Convert the time value into hours and minutes
                const [hours, minutes] = value.split(':')
                // Create a new Date object and set the hours and minutes
                const time = new Date()
                time.setHours(Number(hours))
                time.setMinutes(Number(minutes))
                // Convert the time to a timestamp in milliseconds
                value = time.getTime()
                setFields((prevFields: any) => ({
                    ...prevFields,
                    time: { ...prevFields.time, [field]: value }
                }))
                break
            case 'date':
                // Convert the date value to a timestamp
                const timestamp = Date.parse(value)
                console.log('handleChange  timestamp:', timestamp)
                setFields((prevFields: any) => ({
                    ...prevFields,
                    date: { ...prevFields.date, [field]: timestamp }
                }))
                break
            default:
                break
        }
        setFields((prevFields: any) => ({ ...prevFields, [field]: value }))
    }

    return [fields, setFields, handleChange]
}
