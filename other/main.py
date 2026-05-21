import random
import sys
from collections import deque

import pygame

CELL = 20
COLS, ROWS = 30, 22
WIDTH, HEIGHT = COLS * CELL, ROWS * CELL + 40
FPS_BASE = 10

BG = (18, 18, 24)
GRID = (28, 28, 38)
SNAKE_HEAD = (90, 220, 120)
SNAKE_BODY = (60, 170, 90)
FOOD = (230, 80, 90)
TEXT = (235, 235, 240)
DIM = (140, 140, 150)

UP, DOWN, LEFT, RIGHT = (0, -1), (0, 1), (-1, 0), (1, 0)
OPPOSITE = {UP: DOWN, DOWN: UP, LEFT: RIGHT, RIGHT: LEFT}


def spawn_food(snake):
    free = [(x, y) for x in range(COLS) for y in range(ROWS) if (x, y) not in snake]
    return random.choice(free) if free else None


def draw_grid(screen):
    for x in range(0, COLS * CELL, CELL):
        pygame.draw.line(screen, GRID, (x, 0), (x, ROWS * CELL))
    for y in range(0, ROWS * CELL, CELL):
        pygame.draw.line(screen, GRID, (0, y), (COLS * CELL, y))


def draw_cell(screen, pos, color):
    rect = pygame.Rect(pos[0] * CELL + 1, pos[1] * CELL + 1, CELL - 2, CELL - 2)
    pygame.draw.rect(screen, color, rect, border_radius=4)


def reset():
    mid = (COLS // 2, ROWS // 2)
    snake = deque([(mid[0] - 1, mid[1]), mid, (mid[0] + 1, mid[1])])
    return snake, RIGHT, spawn_food(set(snake)), 0


def main():
    pygame.init()
    pygame.display.set_caption("Snake")
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("menlo,consolas,monospace", 18, bold=True)
    big = pygame.font.SysFont("menlo,consolas,monospace", 36, bold=True)

    snake, direction, food, score = reset()
    queued = direction
    game_over = False
    paused = False

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_UP, pygame.K_w):
                    queued = UP
                elif event.key in (pygame.K_DOWN, pygame.K_s):
                    queued = DOWN
                elif event.key in (pygame.K_LEFT, pygame.K_a):
                    queued = LEFT
                elif event.key in (pygame.K_RIGHT, pygame.K_d):
                    queued = RIGHT
                elif event.key == pygame.K_SPACE:
                    if game_over:
                        snake, direction, food, score = reset()
                        queued = direction
                        game_over = False
                    else:
                        paused = not paused
                elif event.key == pygame.K_r:
                    snake, direction, food, score = reset()
                    queued = direction
                    game_over = False
                elif event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()

        if not game_over and not paused:
            if queued != OPPOSITE[direction]:
                direction = queued
            head = snake[-1]
            new_head = (head[0] + direction[0], head[1] + direction[1])

            hit_wall = not (0 <= new_head[0] < COLS and 0 <= new_head[1] < ROWS)
            hit_self = new_head in snake and new_head != snake[0]

            if hit_wall or hit_self:
                game_over = True
            else:
                snake.append(new_head)
                if new_head == food:
                    score += 1
                    food = spawn_food(set(snake))
                else:
                    snake.popleft()

        screen.fill(BG)
        draw_grid(screen)
        for segment in list(snake)[:-1]:
            draw_cell(screen, segment, SNAKE_BODY)
        draw_cell(screen, snake[-1], SNAKE_HEAD)
        if food is not None:
            draw_cell(screen, food, FOOD)

        bar = pygame.Rect(0, ROWS * CELL, WIDTH, 40)
        pygame.draw.rect(screen, (10, 10, 16), bar)
        screen.blit(font.render(f"Score: {score}", True, TEXT), (12, ROWS * CELL + 10))
        hint = "SPACE pause   R reset   ESC quit"
        hint_surf = font.render(hint, True, DIM)
        screen.blit(hint_surf, (WIDTH - hint_surf.get_width() - 12, ROWS * CELL + 10))

        if paused and not game_over:
            label = big.render("PAUSED", True, TEXT)
            screen.blit(label, label.get_rect(center=(WIDTH // 2, ROWS * CELL // 2)))
        if game_over:
            overlay = pygame.Surface((WIDTH, ROWS * CELL), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 150))
            screen.blit(overlay, (0, 0))
            label = big.render("GAME OVER", True, TEXT)
            sub = font.render("press SPACE to play again", True, DIM)
            screen.blit(label, label.get_rect(center=(WIDTH // 2, ROWS * CELL // 2 - 16)))
            screen.blit(sub, sub.get_rect(center=(WIDTH // 2, ROWS * CELL // 2 + 22)))

        pygame.display.flip()
        clock.tick(FPS_BASE + min(score // 4, 12))


if __name__ == "__main__":
    main()
