interface Test {
  typescript: boolean
};

function test(test: Test) {
  console.log('works', test.typescript);
}

test({ typescript: true });
