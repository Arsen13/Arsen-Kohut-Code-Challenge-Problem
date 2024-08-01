// Time Complexity is O(n), because the loop iterates 'n' times
// Space Complexity is O(1)
function sum_to_n_a(n: number): number {
	let result = 0;

	for (let i = 1; i <= n; i++) {
		result += i;
	}

	return result;
}

// Time Complexity is O(n), func make recursive call 'n' times
// Space Complexity is O(n), each recursive call add a new frame to call stack
function sum_to_n_b(n: number): number {
	if (n <= 0) return 0;

	return n + (sum_to_n_b(n - 1));
}

function sum_to_n_c(n: number): number {
	// your code here
	return n;
}