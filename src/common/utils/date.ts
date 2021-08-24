export const dateFormat = (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = Number(month >= 10 ? month : `0${ month }`);
    day = Number(day >= 10 ? day : `0${ day }`);
    hour = Number(hour >= 10 ? hour : `0${ hour }`)
    minute = Number(minute >= 10 ? minute : `0${ minute }`);
    second = Number(second >= 10 ? second : `0${ second }`)

    return `${ date.getFullYear() }${ month }${ day }${ hour }${ minute }${ second }`;
}