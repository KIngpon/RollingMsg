class SeanAttributeNode
{
    public name:string;
    public attr:any;
    public html:string;
    public children:boolean;
    public end:number;

    constructor(name:string,attr:any,html:string,children:boolean,end:number)
    {
        this.name = name;
        this.attr = attr;
        this.html = html;
        this.children = children;
        this.end = end;
    }
}