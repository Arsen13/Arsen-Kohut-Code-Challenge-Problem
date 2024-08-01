// Time complexity is O(n), because the loop iterates 'n' times
// Space Complexity is O(1)
function sum_to_n_a(n: number): number {
	let result = 0;

	for (let i = 1; i <= n; i++) {
		result += i;
	}

	return result;
}

function sum_to_n_b(n: number): number {
	// your code here
	return n;
}

function sum_to_n_c(n: number): number {
	// your code here
	return n;
}

console.log(sum_to_n_a(10));