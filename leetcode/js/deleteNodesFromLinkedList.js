/**
 * https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/?envType=daily-question&envId=2025-11-01
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const map = {};
  for (const num of nums) map[num] = true;

  let resultHead = null;
  let resultCurrentNode = resultHead;

  let currentNode = head;

  while (currentNode) {
    if (!(currentNode.val in map)) {
      const node = new ListNode(currentNode.val, null);
      if (resultHead === null) {
        resultHead = node;
        resultCurrentNode = resultHead;
      } else {
        resultCurrentNode.next = node;
        resultCurrentNode = resultCurrentNode.next;
      }
    }
    currentNode = currentNode.next;
  }

  return resultHead;
};

const { describe, it } = require("node:test");
const assert = require("node:assert");

const llFromList = (nums) => {
  const head = new ListNode(nums[0], null);
  let current = head;
  for (let i = 1; i < nums.length; i++) {
    const node = new ListNode(nums[i], null);
    current.next = node;
    current = current.next;
  }
  return head;
};

describe("modifiedList", () => {
  it("should give the linked list removing the existing values from nums", () => {
    const nums = [1, 2, 3];
    const ll = llFromList([1, 2, 3, 4, 5]);
    const expected = llFromList([4, 5]);

    assert.deepStrictEqual(modifiedList(nums, ll), expected);
  });
  it("should give null when all the members of linked list is present in the nums array", () => {
    const nums = [1, 2, 3, 4, 5];
    const ll = llFromList([1, 2, 3, 4, 5]);
    const expected = null;

    assert.deepStrictEqual(modifiedList(nums, ll), expected);
  });
});
