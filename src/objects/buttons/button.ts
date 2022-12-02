import { IButtonOptions } from '../../interfaces/buttons/button.interface';
export class Button extends Phaser.GameObjects.Container {
  private clickCallback: Function;
  protected isDown: boolean = false;
  protected tooltip?: Phaser.GameObjects.Text | Phaser.GameObjects.Image;
  
  constructor(aParams: IButtonOptions) {
    super(aParams.scene, aParams.options.x, aParams.options.y);
    
    this.clickCallback = aParams.clickCallback;
    this.on('pointerup', this.onClick);
    this.on('pointerdown', this.onPointerDown);
    this.tooltip = aParams.tooltip;
    if (this.tooltip) {
      this.tooltip.setVisible(false);
      this.tooltip.setDepth(20);
      let xRatio = 200 / this.tooltip.width;
      let yRatio = 200 / this.tooltip.width;
      this.tooltip.setScale(Math.min(xRatio, yRatio));
    }
  }

  public onPointerOver() {
    if (this.scene.input.activePointer.primaryDown) this.isDown = true;
    if (this.tooltip) this.tooltip.setVisible(true);
  }

  public onPointerOut() {
    this.isDown = false;
    if (this.tooltip) this.tooltip.setVisible(false);
  }

  public onPointerDown() {
    this.isDown = true;
  }

  public onClick() {
    if (this.isDown)
      this.clickCallback();
  }

  public update() {
    if (this.tooltip) {
      //console.log('updating tooltip');
      this.tooltip.setX(this.scene.input.activePointer.x - this.x - this.tooltip.displayWidth / 2);
      this.tooltip.setY(this.scene.input.activePointer.y - this.y - this.tooltip.displayHeight - 10);
      if (this.tooltip.visible) {
        //console.log(this.tooltip);
      }
    }
  }
  
}
