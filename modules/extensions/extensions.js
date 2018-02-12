/**
 * Created by Kristian Nielsen on 12-02-2018.
 */
module.exports = {
    getMatches(string, regex){
        const matches = [];
        let result;
        while(result = regex.exec(string)){
            matches.push(result);
        }
        return matches;
    },
    trimMention(string){
        return string.replace(/@|\[|\]/g, '');
    },
    objEach(o, fn){
        for(let k in o){
            if(!o.hasOwnProperty(k)) continue;
            fn(k, o[k]);
        }
    }
};