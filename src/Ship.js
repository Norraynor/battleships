export default function Ship(length) {
    let hitArray = Array(length).fill(false);
    function hit(position){
        hitArray[position]=true;
    }
    function isSunk(){
        for(let i=0; i<hitArray.length;i++){
            if(hitArray[i]===false){
                return false;
            }
        }
        return true;
    }
}
Ship();