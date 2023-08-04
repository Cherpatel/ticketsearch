import "./Faq.css";

import Dropdown from "../../interface/Dropdown/Dropdown";

function CreateQuestion(title, text) {
    this.title = title;
    this.text = text;
}

const questions = [
    new CreateQuestion("Что такое Билетопоиск?", "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов."),
    new CreateQuestion("Какой компании принадлежит Билетопоиск?", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
    new CreateQuestion("Как купить билет на Билетопоиск?", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
    new CreateQuestion("Как оставить отзыв на Билетопоиск?", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
];

export default function Faq() {
    return (
        <section className="faq">
            <h1>Вопросы-ответы</h1>

            <div className="w-questions">
                {questions.map(({ title, text }) => {
                    return (
                        <Dropdown
                            key={title}
                            title={title}
                            text={text}
                        />
                    );
                })}
            </div>
        </section>
    );
}