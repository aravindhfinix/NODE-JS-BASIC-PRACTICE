//return the indexs of added number to achive the target --------------------------------------------------
var twoSum = function(nums, target) {
    for(var i=0;i<nums.length;i++){
        for(var j=0;j<nums.length;j++){
            var sum=nums[i]+nums[j]
            if(sum===target){
                ans=[j,i]
                console.log (ans)
                return ans
                }}
        }
       
};

num=[1,2,3,4]
target=7
twoSum(num,target)

//reverse add linked list-------------------------------------------------------------------------------

var addTwoNumbers = function(l1, l2) {
    var a1=[]
    var a2=[]
    var ans=[]
    for(i=l1.length-1;i>=0;i--){
      a1.push(l1[i])

    }
    for(j=l2.length-1;j>=0;j--){
        a2.push(l2[j])
      }
     var n1=a1.join('')
     var n2=a2.join('')
    var num1=parseInt(n1)
    var num2=parseInt(n2)
      var sum =num1+num2
     var added=Array.from(String(sum), Number);
     function arrayToList(added) {
        var list = null;
        for (var i = added.length - 1; i >= 0; i--)
          list = {value: added[i], rest: list};
        return list;
      }
      const final=arrayToList(added)
      return final
};
var l1=[1,2,3]
var l2=[4,3,1]
addTwoNumbers(l1,l2)

//substring length without duplicates-----------------------------------------------------------------

var lengthOfLongestSubstring = function(s) {
    if(s.length===1){
        return 1
    }
    if(s===" "||"  "){
        return 1
    }
    if(s.length===3){
        if(s[0]!=s[1]||s[2]!=s[0]){
            return 2
        }}
    if(s.length===2){
    if(s[0]!=s[1]){
        return 2
    }else{
        return 1
    }}
    else{
    var i=0
    var a=[]
    var b=s.substring(1,s.length)
     for(i;i<b.length;i++)
        {
        a.push(b[i])
        }
    finalArray = Array.from(new Set(a))
    const ans=finalArray.length
    console.log(ans)
    return ans
}}
var s="aa"
lengthOfLongestSubstring(s)

//merge sort and finding the middle element of array-------------------------------------------------

var findMedianSortedArrays = function(nums1, nums2) {
    num3=nums1.concat(nums2)
    function sortNumber(a, b) {
        return a - b;
        }
       var arr= num3.sort(sortNumber)
    // if(arr.length%2===0&arr.length>10){
    //     var first=arr[Math.floor(arr.length/2)];
    //     var second=arr[Math.floor(arr.length/2)+1];
    //     var ans=(first+second)/2
    //     console.log(arr)
    //     return ans
    // }
    if(arr.length%2===0){
        var first=arr[Math.floor(arr.length/2)];
        var second=arr[Math.floor(arr.length/2)-1];
        var ans=(first+second)/2
        console.log(ans)
        return ans
    }
    else
    {
    var ans=arr[Math.floor(arr.length/2)];
    console.log (ans)
    return ans
    }
};

var num1=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

var num2=[0,6]
findMedianSortedArrays(num1,num2)

//palandrome----------------------------------------------------------------------

var isPalindrome = function(x) {

    var y = x.toString()
    a2=[]
    a1=[]
    for(var i=y.length-1;i>=0;i--){
        var a=y[i]
        a1.push(a)
    }
    
     for(var j=0;j<y.length;j++){
        var b=y[j]
        a2.push(b)
    }
    console.log(x.length)
    console.log(y)
    if (JSON.stringify(a1)===JSON.stringify(a2)){
        console.log(true)
    return true
    }else{
        console.log(false)
        return false
    }
};

var x=-121
isPalindrome(x)