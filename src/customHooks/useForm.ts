import { useState } from "react"

export const useForm = (initialState: any) => {
    const [fields, setFields] = useState(initialState)

    function handleChange({ target }: any) {
        let { value, name: field, type } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'time':
                const [hours, minutes] = value.split(':')
                let time = new Date()
                time.setHours(Number(hours))
                time.setMinutes(Number(minutes))
                let timeValue = time.getTime()
                if (hours === '00' && type === 'time') {
                    timeValue += 24 * 60 * 60 * 1000
                }
                value = timeValue
                break
            case 'date':
                const [year, month, day] = value.split('-')
                const date = new Date(Number(year), Number(month) - 1, Number(day))
                value = date.getTime()
                break
            default:
                break
        }

        setFields((prevFields: any) => {
            if (type === 'date' || type === 'time') {
                const mainField = field.split('.')[0]
                return {
                    ...prevFields,
                    [type]: { ...prevFields[type], [mainField]: value }
                }
            } else {
                return {
                    ...prevFields,
                    [field]: value,
                }
            }
        })    }

    return [fields, setFields, handleChange] as const
}
