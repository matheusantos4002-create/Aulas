class ComponenteMonitor {
    constructor(idElemento) {
        this.elemento = document.getElementById(idElemento);
        if (!this.elemento) console.error(`Elemento ${idElemento} não encontrado.`);
    }
}

class CardHardware extends ComponenteMonitor {
    constructor(idCard, idValor) {
        super(idCard);
        this.valorTexto = document.getElementById(idValor);
    }

    
    atualizarInterface(valor, tipo) {
        this.valorTexto.innerText = valor;

        
        const num = parseFloat(valor);
        let alerta = false;

        
        switch (tipo) {
            case 'temp':
                if (num > 75) alerta = true;
                break;
            case 'cpu':
                
                if (num > 90) alerta = true;
                break;
            case 'ram':
                
                if (num > 14) alerta = true;
                break;
        }

        if (alerta) {
            this.elemento.classList.add('alerta-critico');
        } else {
            this.elemento.classList.remove('alerta-critico');
        }
    }
}


const monitorCPU = new CardHardware('cpu-card', 'cpu-val');
const monitorRAM = new CardHardware('ram-card', 'ram-val');
const monitorTemp = new CardHardware('temp-card', 'temp-val');

async function buscarDados() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();

        monitorCPU.atualizarInterface(data.cpuUsage, 'cpu');
        monitorRAM.atualizarInterface(data.ramUsageGB, 'ram');
        monitorTemp.atualizarInterface(data.cpuTemperature, 'temp');

    } catch (error) {
        console.error("Erro na busca:", error);
    }
}

setInterval(buscarDados, 2000);
buscarDados();