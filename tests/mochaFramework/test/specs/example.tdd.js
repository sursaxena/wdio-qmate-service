suite("assertion", () => {
  test("all globals are in place", () => {
    expect(non_ui5).toBeTruthy();
    expect(ui5).toBeTruthy();
    expect(utilities).toBeTruthy();
  });
});


