export class AuthService{
    isLoggin=false;
    isAuthenticated(){
        const promise=new Promise(
            (reslove,reject )=>{
                setTimeout(
                    ()=>{
                        reslove(this.isLoggin)
                    },1000
                )
            }
        )
        return promise
    }

    setLoggin(){
        this.isLoggin=true
    }
    setLogout(){
        this.isLoggin=false
    }
}