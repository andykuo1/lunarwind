export function DialogueScreen() {
  return (
    <article className="fixed bottom-0 left-0 right-0 flex">
      <section className="relative m-8 flex flex-1 rounded-xl bg-white p-8 text-black">
        <img src="portrait.png" className="" />
        <div>
          <h3 className="text-xl font-bold">Peter</h3>
          <p>Heya! How's it going?</p>
        </div>
        <button className="absolute bottom-8 right-8">Next</button>
      </section>
    </article>
  );
}
