import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export function hp(number : number){

    return( (number * height )/100)

}


export function wp(number:number){ 
    return ((number * width)/100)
}

