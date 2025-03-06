/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let l1Current = l1;
    let l2Current = l2;
    let currentNodeIndex = 0;
    let carry = 0;
    let sum = new ListNode();

    while(l1Current.val != undefined || l2Current.val != undefined || carry != 0) {
        const l1Val = l1Current.val || 0;
        const l2Val = l3Current.val || 0;
        
        const sumOfDigits = (l1Val + l2Val + carry);
        const rem = sumOfDigits % 10;
        const carry = sumOfDigits >= 10 ? 1 : 0;
        
        const newNode = new ListNode(rem);
    }

    return sum;
};
