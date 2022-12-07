import './sources.css';

class Sources {
    draw(data: any) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLMediaElement = document.querySelector('#sourceItemTemp');

        data.forEach((item: any) => {
            if (!(sourceItemTemp instanceof HTMLTemplateElement)) return
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            (sourceClone as HTMLTemplateElement).querySelector('.source__item-name').textContent = item.name;
            (sourceClone as HTMLTemplateElement).querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
