import { Source } from '../../entities/data';
import './sources.css';

export default class Sources {
    public draw(data: Readonly<Array<Source>>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLMediaElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            if (!(sourceItemTemp instanceof HTMLTemplateElement)) return;
            const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            const itemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            if (itemName != null) {
                itemName.textContent = item.name;
            }
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}
