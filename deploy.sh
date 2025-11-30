#!/bin/bash
set -e

LANDING_PATH="/opt/landing-chatdelta"
CONTAINER_NAME="landing-chatdelta"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploy Script - Landing Page Chat Delta${NC}"
echo ""

# Função de rollback
rollback() {
    echo -e "${YELLOW}🔄 Iniciando rollback...${NC}"
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true

    LATEST_BACKUP=$(ls -t $LANDING_PATH | grep backup | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        sudo mv $LANDING_PATH/current $LANDING_PATH/failed-$(date +%Y%m%d-%H%M%S)
        sudo mv $LANDING_PATH/$LATEST_BACKUP $LANDING_PATH/current

        docker run -d \
            --name $CONTAINER_NAME \
            --restart unless-stopped \
            -p 127.0.0.1:3000:3000 \
            -v $LANDING_PATH/current:/app \
            -w /app \
            node:20-alpine \
            node server.js

        echo -e "${GREEN}✅ Rollback concluído${NC}"
    else
        echo -e "${RED}❌ Nenhum backup disponível${NC}"
        exit 1
    fi
}

# Comandos
case "$1" in
    logs)
        docker logs -f $CONTAINER_NAME
        ;;
    restart)
        echo -e "${YELLOW}♻️  Reiniciando container...${NC}"
        docker restart $CONTAINER_NAME
        echo -e "${GREEN}✅ Container reiniciado${NC}"
        ;;
    stop)
        echo -e "${YELLOW}⏸️  Parando container...${NC}"
        docker stop $CONTAINER_NAME
        echo -e "${GREEN}✅ Container parado${NC}"
        ;;
    start)
        echo -e "${YELLOW}▶️  Iniciando container...${NC}"
        docker start $CONTAINER_NAME || {
            docker run -d \
                --name $CONTAINER_NAME \
                --restart unless-stopped \
                -p 127.0.0.1:3000:3000 \
                -v $LANDING_PATH/current:/app \
                -w /app \
                node:20-alpine \
                node server.js
        }
        echo -e "${GREEN}✅ Container iniciado${NC}"
        ;;
    status)
        echo -e "${YELLOW}📊 Status do container:${NC}"
        docker ps -a --filter name=$CONTAINER_NAME --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        echo -e "${YELLOW}🌐 Health check:${NC}"
        if curl -f -s http://127.0.0.1:3000 > /dev/null; then
            echo -e "${GREEN}✅ Landing page respondendo${NC}"
        else
            echo -e "${RED}❌ Landing page não responde${NC}"
        fi
        ;;
    rollback)
        rollback
        ;;
    backups)
        echo -e "${YELLOW}💾 Backups disponíveis:${NC}"
        ls -lht $LANDING_PATH | grep backup | head -5
        ;;
    clean)
        echo -e "${YELLOW}🧹 Limpando backups antigos (mantém últimos 3)...${NC}"
        cd $LANDING_PATH
        ls -t | grep backup | tail -n +4 | xargs -r sudo rm -rf
        echo -e "${GREEN}✅ Limpeza concluída${NC}"
        ;;
    *)
        echo "Uso: $0 {logs|restart|stop|start|status|rollback|backups|clean}"
        echo ""
        echo "Comandos:"
        echo "  logs     - Ver logs do container"
        echo "  restart  - Reiniciar container"
        echo "  stop     - Parar container"
        echo "  start    - Iniciar container"
        echo "  status   - Ver status e health"
        echo "  rollback - Voltar para versão anterior"
        echo "  backups  - Listar backups disponíveis"
        echo "  clean    - Limpar backups antigos"
        exit 1
        ;;
esac
