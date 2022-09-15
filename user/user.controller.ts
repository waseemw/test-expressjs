import {object, string} from "zod";
import {endpoint, Path} from "../decorators";

let example = object({
    test: string().min(15).max(30),
    last: string().optional(),
});

export class UserController {
    @Path("/user")
    doSomething(body: object) {
        let b = example.parse(body);
        console.log(JSON.stringify(b));
    }
}

endpoint("/user/test", body => {
    return {ans: "hey"};
});