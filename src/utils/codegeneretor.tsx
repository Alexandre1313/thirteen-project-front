const Generator = (): string => {
    const ArrayCharacters: string = 'A1B2C3D4EFGHIJKLMNOPQRSTUWXYZ567890';
    let code: string = '';
    while(code.length !== 4){
        let char = ArrayCharacters[Math.round(Math.random() * 34)];
        if(!code.includes(char)){
            code += char
        }
    }
    return ''
}

export default Generator
