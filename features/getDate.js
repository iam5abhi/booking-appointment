export function getDate(argument){
    let CreateDate = new Date(argument)
        let date = CreateDate.getDate()>9?CreateDate.getDate():`0${CreateDate.getDate()}`
        let month = CreateDate.getMonth()>9?CreateDate.getMonth():`0${CreateDate.getMonth()}`
        let year = CreateDate.getFullYear()>9?CreateDate.getFullYear():`0${CreateDate.getFullYear()}`
    return `${date}/${month}/${year}`
}

export function getTime(argument){
    let CreateDate = new Date(argument)
        let hour = CreateDate.getHours()>9?CreateDate.getHours():`0${CreateDate.getHours()}`
        let minute = CreateDate.getMinutes()>9?CreateDate.getMinutes():`0${CreateDate.getMinutes()}`
        let second = CreateDate.getSeconds()>9?CreateDate.getSeconds():`0${CreateDate.getSeconds()}`
    return `${hour}:${minute}:${second}`
}